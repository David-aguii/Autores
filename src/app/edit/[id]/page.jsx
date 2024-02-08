"use client";
 
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import { useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import TopNav from '../../components/TopNav'
import './edita.css'
import { useRouter } from "next/navigation";
const EditAutor = () => {
  const [nombre, setNombre] = useState("");
  const router = useRouter()
  const { id } = useParams();
  
  const getOneAutor = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/autor/${id}`);
      const result = response.data;
      setNombre(result.nombre);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAutor = async (e) => {
    e.preventDefault();
    const updatedAutor = {
      nombre
    };
    try {
      if(nombre.length > 3){
        const response = await axios.put(`http://localhost:8000/api/autor/${id}`, updatedAutor);
        console.log(response.data);
        router.push("/");
      }else{
        alert("Debe de tener al menos tres caracteres")
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneAutor();
  }, [id]);

  

  return (
    <div>
      <TopNav titulo="back to home" direccion="../"  />
      <h3>Edit this author </h3>
      <Box
        sx={{ border: "3px solid black", padding: 4, width: 700, height: 350 }}
      >
        <form >
          <Stack direction={"row"}>
            <Stack direction="column" spacing={1}>
              <Stack spacing={1} alignItems="flex-start">
                <Typography
                  variant="h6"
                  component="label"
                  sx={{ minWidth: "fit-content" }}
                >
                  {" "}
                  Autor Name:
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  helperText={
                    nombre.length < 3 && nombre.length>0
                      ? "Debes de escribir al menos 3 caracteres"
                      : ""
                  }
                  error={nombre.length < 3 && nombre.length>0}
                />
                <button className="button">Cancel</button>
                 <Stack className="buttons">
                    <button className="button"onClick={handleUpdateAutor}>Submit</button>
                </Stack>
              </Stack>
              </Stack>
              </Stack>
        </form>
      </Box>
    </div>
  );
}

export default EditAutor;
