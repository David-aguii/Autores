"use client";
import TopNav from "./components/TopNav";
import "./page.css";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  button,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [autor, setAutor] = useState([]);

  const getAutor = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/autor");
      const result = response.data;
      console.log(result);
      setAutor(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOneAutor = async (autorId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/autor/${autorId}`
      );
      if (response.status === 200) {
        setAutor((prevautors) =>
          prevautors.filter((autor) => autor._id !== autorId)
        );
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al eliminar el autor:", error);
    }
  };
  useEffect(() => {
    getAutor();
  }, []);

  return (
    <main>
      <TopNav titulo="Add a author to the list" direccion="../new" />
      <h3>We have quotes by:</h3>
      <Table
        sx={{ width: 400, border: "2px solid black" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Actions available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {autor.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>
                <Link
                  style={{ textAlign: "center" }}
                  href={`./edit/${item._id}`}
                >
                  <button className="editbutton">Edit</button>
                </Link>
                <button
                  className="deletebutton"
                  onClick={(e) => deleteOneAutor(item._id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
