import { Button } from "@mui/material";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import inputlogo from "../assests/image/WhatsApp Image 2022-11-24 at 14.55.11.jpeg"
const InputBox = (props) => {
    const [file1, setfile1] = useState("block");
    const [fileupload, setfileupload] = useState({
        style: "none",
        path: ""
    })
    function removeInput(e) {
        var path = e.target.value
        if (props.parsing) {
            props.parsing(e)
        }
        if(props.jsonDatareciever){
            props.jsonDatareciever(e);
        }
        setfileupload({
            style: "block",
            path: path.substr(12)
        })
        setfile1("none")
    }
    let filestype = [props.type]
    // console.log(file1);
    return (<>
        <div style={{ display: "flex", backgroundColor: "#9BD6D2", border: "2px solid black", borderRadius: "15px", textAlign: "center", padding: '10px' }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "left", maxInlineSize: "150px" }}>
                <div>
                    Drag-and-Drop the {props.text} Here
                    <br />
                    <br />
                    OR
                </div>
                <br />
                <div>
                    <Button variant="contained" component="label" style={{ display: file1 }}>
                        Upload File
                        <input hidden accept={props.type} multiple type="file" required onChange={e => removeInput(e)} />
                    </Button>
                    <div style={{ fontSize: "20px", fontWeight: "bold", display: fileupload.style }}>
                        {fileupload.path} is Uploaded
                    </div>
                </div>
            </div>
            <div>
                <img src={inputlogo} alt="Input File" style={{ height: "70%", margin: 'auto' }} />
            </div>
        </div>
    </>)
}
export default InputBox;