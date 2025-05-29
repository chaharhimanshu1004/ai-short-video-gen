"use client"
import React, { useEffect, useState } from 'react'
import Topic from './_components/Topic'
import VideoStyle from './_components/VideoStyle';
import Voice from './_components/Voice';
import Captions from './_components/Captions';
import { Button } from '@/components/ui/button';
import { Loader2Icon, WandSparkles } from 'lucide-react';
import Preview from './_components/Preview';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuthContext } from '@/app/provider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function CreateNewVideo() {
    const [formData, setFormData] = useState();
    const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);
    const { user, setUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
        console.log(formData);
    }

    useEffect(() => {
        let timer;
        if (!user) {
            timer = setTimeout(() => {
                toast.error('Sorry, you need to login');
                router.push('/');
            }, 10000); // 10 seconds timeout
        }
        
        return () => {
            clearTimeout(timer);
        };
    }, [user, router]);

    if (!user) {
        return (
            <div className="flex items-center justify-center -mt-12 h-screen">
                <p className="text-2xl font-bold text-gray-500">Hold on, we are setting things for you...</p>
            </div>
        )
    }

    const GenerateVideo = async () => {

        if (user?.credits <= 0) {
            toast.error('Please add more credits!')
            return;
        }

        if (!formData?.topic || !formData?.script || !formData.videoStyle || !formData?.caption || !formData?.voice) {
            console.log("ERROR", "Enter All Field");
            toast.error('Please fill out all details');
            if(!formData?.script){
                toast.error('Please generate script first');
            }
            return;
        }
        
        setLoading(true)
        // Save Video Data First
        const resp = await CreateInitialVideoRecord({
            title: formData.title,
            topic: formData.topic,
            script: formData.script,
            videoStyle: formData.videoStyle,
            caption: formData.caption,
            voice: formData.voice,
            uid: user?._id,
            createdBy: user?.email,
            credits: user?.credits
        });

        const result = await axios.post('/api/generate-video-data', {
            ...formData,
            recordId: resp,
        });

        setLoading(false);
        setUser(prev => ({
            ...prev,
            credits: user?.credits - 1
        }))
        router.replace('/dashboard')
    }

    return (
        <div className="container mx-auto py-0 px-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-8">Create New Video</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-black/75 backdrop-blur-sm rounded-xl border border-slate-700/40 p-6 shadow-lg hover:shadow-slate-700/10">
                        <Topic onHandleInputChange={onHandleInputChange} />
                    </div>
                    
                    <div className="bg-black/75 backdrop-blur-sm rounded-xl border border-slate-700/40 p-6 shadow-lg hover:shadow-slate-700/10">
                        <VideoStyle onHandleInputChange={onHandleInputChange} />
                    </div>
                    
                    <div className="bg-black/75 backdrop-blur-sm rounded-xl border border-slate-700/40 p-6 shadow-lg hover:shadow-slate-700/10">
                        <Voice onHandleInputChange={onHandleInputChange} />
                    </div>
                    <div className="bg-black/75 backdrop-blur-sm rounded-xl border border-slate-700/40 p-6 shadow-lg hover:shadow-slate-700/10">
                        <Captions onHandleInputChange={onHandleInputChange} />
                    </div>
                    
                    <Button 
                        className="w-full py-6 text-lg bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg shadow-teal-500/20 mt-6"
                        disabled={loading}
                        onClick={GenerateVideo}
                    >
                        {loading ? 
                            <><Loader2Icon className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : 
                            <><WandSparkles className="mr-2 h-5 w-5" /> Generate Video</>
                        }
                    </Button>
                </div>
                
                <div className="bg-black/75 backdrop-blur-sm rounded-xl border border-slate-700/40 p-6 shadow-lg hover:shadow-slate-700/10 h-fit sticky top-8">
                    <Preview formData={formData} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewVideo;