import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import styled from 'styled-components';
//import { CloseIcon } from '@bit/zenhomes.react-components.close-icon';
function App() {
  const ImagePreview = styled.div`
    position: relative;
    /* cursor: pointer; */
    #uploaded-image{
      height: 480px;
      width: 480px;
        object-fit: cover;
        border-radius: 20px;
    }
    .close-icon{
        background: #000;
        border-radius: 5px;
        opacity: .8;
        position: absolute;
        z-index: 10;
        right: 15px;
        top: 20px;
        cursor: pointer;
        :hover {
            opacity: 1;
        }   
    }
`
// to change image path after every upload 

  const [imageHash, setHash] = useState("");
  const [content_file, setcontentFile] = useState("")
  const [content_image, setcontentImage] = useState("");
  const [content_isUploaded, setcontentIsUploaded] = useState(false);
  const [content_typeFile, setcontentTypeFile] = useState("");
  
  function handlecontentImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setcontentTypeFile(e.target.files[0].type);
      setcontentFile(e.target.files[0])
      let reader = new FileReader();

      reader.onload = function (e) {
        
        setcontentImage(e.target.result);
        setcontentIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }
  // const [style_image, setstyleImage] = useState("");
  // const [style_isUploaded, setstyleIsUploaded] = useState(false);
  // const [style_typeFile, setstyleTypeFile] = useState("");
  
  // function handlestyleImageChange(e) {
  //   if (e.target.files && e.target.files[0]) {
  //     setstyleTypeFile(e.target.files[0].type);
  //     let reader = new FileReader();

  //     reader.onload = function (e) {
  //       setstyleImage(e.target.result);
  //       setstyleIsUploaded(true);
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // }

  function handleUpload(){
    var formdata = new FormData();
    formdata.append("Images", content_file, "[PROXY]");
    fetch('http://localhost:5000/upload', { // Your POST endpoint
    method: 'POST',
    body: formdata,
    redirect: 'follow' // This is your file object
  }).then(
    response =>{
       var path = "http://localhost:5000/result";
       setHash(Date.now())
      setcontentImage(`${path}?${imageHash}`);
      

    }
  ).catch(
    error => console.log(error) // Handle the error response object
  );
  }
  return (
    <div class="container">
	<div class="row">
	  <div class="col-md-12">
    {
      !content_isUploaded ? (
          <form method="post" action="#" id="#">
            
                
                
                
                <div class="form-group files">
                  <label>Upload Your Content Image</label>
                  <input type="file" class="form-control" multiple="" accept= ".jpg,.jpeg,.gif,.png,.mov,.mp4" onChange={handlecontentImageChange}></input>
                </div>
                
              
            </form>
      ):(
        <ImagePreview>
                <label>Image preview</label>
                {content_typeFile.includes("video") ? (
                  <video
                    id="uploaded-image"
                    src={content_image}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"

                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={content_image}
                    draggable={false}
                    alt="uploaded-img"
                    onClick={() => {
                      setcontentIsUploaded(false);
                      setcontentImage(null);
                    }}
                  />
                )}
              </ImagePreview>
      )
  }
	      
	  </div>
	  {/* <div class="col-md-6">
    {
      !style_isUploaded ? (
          <form method="post" action="#" id="#">
            
                
                
                
                <div class="form-group files">
                  <label>Upload Your Style Image</label>
                  <input type="file" class="form-control" multiple="" accept= ".jpg,.jpeg,.gif,.png,.mov,.mp4" onChange={handlestyleImageChange}></input>
                </div>
                
              
            </form>
      ):(
        <ImagePreview>
                <label>Style Image</label>
                {style_typeFile.includes("video") ? (
                  <video
                    id="uploaded-image"
                    src={style_image}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"
                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={style_image}
                    draggable={false}
                    alt="uploaded-img"
                    onClick={() => {
                      setstyleIsUploaded(false);
                      setstyleImage(null);
                    }}
                  />
                )}
              </ImagePreview>
      )
  }
	      
	  </div> */}
	</div>
  <button type="button" class="btn btn-success btn-block" onClick={
    handleUpload
  }>Stylize</button>
</div>
  );
}

export default App;
