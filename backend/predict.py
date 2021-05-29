import argparse
import os
import sys
import time
import re
from PIL import Image
import numpy as np
import torch
from torch.optim import Adam
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision import transforms
import torch.onnx

from transformer_net import TransformerNet
# model credits https://github.com/pytorch/examples/tree/master/fast_neural_style
def load_image(filename, size=None, scale=None):
    img = Image.open(filename).convert('RGB')
    if size is not None:
        img = img.resize((size, size), Image.ANTIALIAS)
    elif scale is not None:
        img = img.resize((int(img.size[0] / scale), int(img.size[1] / scale)), Image.ANTIALIAS)
    return img

def save_image(filename, data):
    img = data.clone().clamp(0, 255).detach().numpy()
    img = img.transpose(1, 2, 0).astype("uint8")
    img = Image.fromarray(img)
    img.save(filename)


def stylize(args):
    device = torch.device("cpu")

    content_image = load_image(args['image'])
    content_transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Lambda(lambda x: x.mul(255))
    ])
    content_image = content_transform(content_image)
    content_image = content_image.unsqueeze(0).to(device)


    style_model = TransformerNet()
    state_dict = torch.load(args['model'])
    # remove saved deprecated running_* keys in InstanceNorm from the checkpoint
    for k in list(state_dict.keys()):
        if re.search(r'in\d+\.running_(mean|var)$', k):
            del state_dict[k]
    style_model.load_state_dict(state_dict)
    style_model.to(device)
    output = style_model(content_image).cpu()
    
    save_image(args['output'], output[0])

if __name__ == '__main__':
    stylize({
        'output': 'output/output.jpg',
        'model': 'models/udnie.pth',
        'image': 'images/amber.jpg'
    })
