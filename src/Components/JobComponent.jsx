/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Posts from './Posts'
import PageComponent from './PageComponent'
// import { UserContext } from './SearchJobComponent';

export default function JobComponent() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    // const [jobs, setJobs] = useState([]);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        const fetchPosts = async () => {
            // Update the document title using the browser API
            setLoading(true)
            axios.get('https://jobs.github.com/positions.json')
                .then(res => {
                    setPosts(res.data)
                })
                .catch(error => console.log(error))
            setLoading(false)
        }
        fetchPosts();


    }, []);


    //Get Current Posts 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const descriptionOnChange = (e) => {
        let valueEntered = e.target.value;
        // console.log("value", valueEntered);
        let postsFiltered = [];
        postsFiltered = posts.filter(post => (post.title.toLowerCase()).indexOf(valueEntered.toLowerCase()) !== -1);
        // console.log('posts filtered', postsFiltered);
        setPosts(postsFiltered);
    }

    const locationOnChange = (e) => {
        let valueEntered = e.target.value;
        console.log("value", valueEntered);
        let postsFiltered = [];
        postsFiltered = posts.filter(post => (post.location.toLowerCase()).indexOf(valueEntered.toLowerCase()) !== -1);
        console.log('posts filtered', postsFiltered);
        setPosts(postsFiltered);
    }

    console.log('data', posts);
    return (
        <div>
            {/* {
                posts.map(job => {
                    return (
                        <div key={job.id} className="job-container">
                            <div className="top-header">
                                <div className="title">{job.title}</div>
                                <div ><img src={job.company_logo} alt="company-logo" className="image-container" /></div>
                            </div>
                            <div className="created-at">{job.created_at}</div>
                            <div className="button-container">
                                <button className="job-button">Full Time</button>
                                <button className="job-button button2">Fully Remote</button>
                            </div>

                            <div className="content-container">
                                Please use the following link to get in touch <br />
                                <a href={job.company_url}>{job.company_url}</a>
                            </div>
                            <div><button className="job-button view-button">View Details</button></div>
                        </div>
                    )
                })
            } */}

            <div className="form-container">
                <form>
                    <label>Description</label>
                    <br />
                    <input type="text" className="input-container" onChange={descriptionOnChange} />
                    <br />
                </form>
                <form>
                    <label>Location</label>
                    <br />
                    <input type="text" className="input-container" onChange={locationOnChange} />
                </form>
                <form>
                    <br />
                    <input type="checkbox" />
                    <label >Only Full Time</label>

                </form>
            </div>

            <Posts posts={currentPosts} loading={loading} />

            <PageComponent postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
    )
}
