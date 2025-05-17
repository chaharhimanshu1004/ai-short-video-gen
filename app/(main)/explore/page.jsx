"use client"
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react'
import React, { useEffect, useState } from 'react'
import VideoList from '../dashboard/_components/VideoList';

function Explore() {
    // const convex = useConvex();
    // const [videoList, setVideoList] = useState([]);
    // useEffect(() => {
    //     GetAllVideo();
    // }, [])

    // const GetAllVideo = async () => {
    //     const result = await convex.query(api.videoData.GetLatestVideo, {});
    //     console.log(result);
    //     setVideoList(result);
    // }
    return (
        <div>
            <h2 className='font-bold text-3xl'>Explore Other Creators Video</h2>
            <VideoList explore={true} />
        </div>
    )
}

export default Explore