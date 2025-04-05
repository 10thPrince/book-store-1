import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

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
            <div className=''>
                <h1>Books List</h1>
                <Link to={'/books/create'}>
                    <MdOutlineAddBox className='text-sky-600 text-4xl'/>
                </Link>
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
                                books.map((book, index) => (
                                    <tr>
                                        <td key={book._id}>
                                            {index +1}
                                        </td>
                                        <td>
                                            {book.title}
                                        </td>
                                        <td>
                                            {book.author}
                                        </td>
                                        <td>
                                            {book.publishYear}
                                        </td>
                                        <td>
                                            <div>
                                                <Link to={`/books/details/${book._id}`}>
                                                    <BsInfoCircle className='text-green-600 text-2xl'/>
                                                </Link>
                                                <Link to={`/books/edit/${book._id}`}>
                                                    <AiOutlineEdit className='text-yellow-600 text-2xl'/>
                                                </Link>
                                                <Link to={`/books/delete/${book._id}`}>
                                                    <MdOutlineDelete className='text-red-600 text-2xl'/>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default Home