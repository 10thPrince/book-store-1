import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAdddBox, MdOutlineDelete } from 'react-icons/md'

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }, [])
    return (
        <div>
            <div>
                <h1>Books List</h1>
                <Link to={'/books/create'}>Create book</Link>
            </div>
            {
                loading ? (
                <Spinner />
                ) : (
                
                <table>
                    <thead>
                        <tr>
                            <th className=''>No.</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>PublishYear</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book, index)=>{
                                <td>
                                    
                                </td>
                            })
                        }
                    </tbody>
                </table>
                )
            }
        </div>
    )
}

export default Home