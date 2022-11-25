import { Button } from "@mui/material";

const ResultPage = (props) => {
    function backtoHome(e){
        props.fun(0);
    }
    return (
        <>
            <div style={{ height: "60px" }}></div>
            <div style={{ display: "flex", textAlign: "center", backgroundColor: "#F2EBDF", height: '80px', border: "2px solid black", borderRadius: '10px' }}>
                <div style={{ width: '30%', margin: "auto", display: "flex", justifyContent: "center" }}>
                    <Button variant="contained">Copy</Button>
                    <div style={{ width: '10px' }}>

                    </div>
                    <Button variant="contained">Paste</Button>
                </div>
                <div style={{ width: "40%", margin: "auto", display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" color="success">View JSON</Button>
                    <div style={{ width: "10%" }}></div>
                    <Button variant="contained" color="success">View Code</Button>

                </div>
                <div style={{ width: "30%", margin: "auto" }}>
                    <Button variant="contained" onClick={e=>backtoHome(e)}>Upload New</Button>
                </div>
            </div>
            <div style={{ height: "50px" }}></div>
            <div style={{ width: "90%", border: "1px solid black", height: "600px", margin: "auto" }}>

            </div>
            <div style={{height:'30px'}}></div>
            <div style={{ width: "100%", textAlign:"center" }}>
                <div style={{width:'40%' ,margin:"auto", display:"flex", justifyContent:"center"}}>
                    <Button variant="contained" style={{boxShadow:"0px 1px 1px 0px black"}}>Download JSON</Button>
                    <div style={{width:"10%"}}></div>
                    <Button variant="contained" style={{boxShadow:"0px 1px 1px 0px black"}}>Download Code</Button>

                </div>

            </div>
        </>
    );
}
export default ResultPage;