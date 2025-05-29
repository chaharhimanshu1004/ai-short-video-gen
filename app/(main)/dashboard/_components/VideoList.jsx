"use client"
import { useAuthContext } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { RefreshCcw } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function VideoList({ explore = false }) {
    const [videoList, setVideoList] = useState([]);
    const convex = useConvex();
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(!user) {
            setLoading(true);
            return; // Exit early if no user
        }
        
        // Only proceed with loading videos if user exists
        GetUserVideoList();
    }, [user])

    const GetUserVideoList = async () => {
        setLoading(true);
        let result = [];
        if (explore) {
            result = await convex.query(api.videoData.GetLatestVideo, {});
        }
        else {
            result = await convex.query(api.videoData.GetUserVideos, {
                uid: user?._id
            });
        }
        setVideoList(result);
        setLoading(false);

        const isPendingVideo = result?.find((item) => item.status == 'pending');
        isPendingVideo && GetPendingVideoStatus(isPendingVideo);
    }

    const GetPendingVideoStatus = (pendingVideo) => {
        const intervalId = setInterval(async () => {
            // Get Video Data by Id
            const result = await convex.query(api.videoData.GetVideoById, {
                videoId: pendingVideo?._id
            })

            if (result?.status == 'completed') {
                clearInterval(intervalId);
                GetUserVideoList();
            }

        }, 5000)
    }

    return (
        <div>
            {loading ? (
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10'>
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                        <div key={index} className='aspect-[2/3] w-full bg-secondary animate-pulse rounded-xl'>
                        </div>
                    ))}
                </div>
            ) : videoList?.length === 0 ? (
                <div className='flex flex-col items-center justify-center mt-28 gap-5 p-8 
                    border border-gray-800 rounded-xl py-16 bg-black/75 backdrop-blur-sm
                    shadow-lg hover:shadow-slate-700/10 transition-all duration-300
                    hover:border-gray-700'>
                    
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full blur-sm opacity-40"></div>
                        <Image src={'/logo.svg'} alt='logo' width={70} height={70} className="relative z-10" />
                    </div>
                    
                    <h2 className='text-xl font-semibold bg-gradient-to-r from-white via-teal-100 to-cyan-100 bg-clip-text text-transparent'>
                        No Videos Created Yet
                    </h2>
                    
                    <p className='text-gray-400 text-center mb-2'>
                        Start creating engaging short videos with just a few clicks
                    </p>
                    
                    <Link href={'/create-new-video'}>
                        <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 
                            text-white border-0 rounded-xl shadow-lg shadow-teal-900/20 px-5 py-6 text-lg 
                            transition-all duration-300 font-medium hover:shadow-teal-900/30 hover:translate-y-px">
                            <span className="flex items-center">
                                <span className="mr-2">+</span> Create New Video
                            </span>
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10'>
                    {videoList.map((video, index) => (
                        <Link key={index} href={'/play-video/' + video?._id}>
                            <div className='relative'>
                                {video?.status == 'completed' ? <Image src={video?.images ? video?.images[0] : '/logo.svg'}
                                    alt={video?.title}
                                    width={500}
                                    height={500}
                                    className='w-full object-cover rounded-xl
                                aspect-[2/3]'
                                /> :
                                    <div className='aspect-[2/3] p-5 w-full rounded-xl bg-slate-900
                                flex items-center justify-center gap-2'>
                                        <RefreshCcw className='animate-spin' />
                                        <h2>Generating...</h2>
                                    </div>}
                                <div className='absolute bottom-3 px-5 w-full'>
                                    <h2>{video?.title}</h2>
                                    <h2 className='text-sm'>{moment(video?._creationTime).fromNow()}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default VideoList