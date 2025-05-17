
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon, SparklesIcon } from 'lucide-react'
import axios from 'axios'
import { useAuthContext } from '@/app/provider'
import toast from 'react-hot-toast'

const suggestions = [
    "Historic Story",
    "Kids Story",
    "Movie Stories",
    "AI Innovations",
    "Space Mysteries",
    "Horror Stories",
    "Mythological Tales",
    "Tech Breakthroughs",
    "True Crime Stories",
    "Fantasy Adventures",
    "Science Experiments",
    "Motivational Stories",]

function Topic({ onHandleInputChange }) {
    const [selectedTopic, setSelectedTopic] = useState();
    const [selectedScriptIndex, setSelectedScriptIndex] = useState();
    const [scripts, setScripts] = useState();
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();

    const GenerateScript = async () => {
        if (user?.credits <= 0) {
            toast.error('Please add more credits!')
            return;
        }
        setLoading(true);
        setSelectedScriptIndex(null);
        console.log(selectedTopic)
        try {
            const result = await axios.post('/api/generate-script', {
                topic: selectedTopic
            });
            console.log(result.data);
            setScripts(result.data?.scripts);
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold mb-2">Project Title</h2>
                <Input
                    placeholder="Enter project title"
                    className="bg-slate-800/50 border-slate-700"
                    onChange={(event) => {
                        onHandleInputChange('title', event?.target.value);
                    }}
                />
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Video Topic</h2>
                <p className="text-sm text-gray-400 mb-2">Select topic for your video</p>

                <Tabs defaultValue="suggestion" className="w-full">
                    <TabsList className="w-full mb-4 bg-slate-800/70">
                        <TabsTrigger value="suggestion" className="flex-1">Suggestions</TabsTrigger>
                        <TabsTrigger value="your_topic" className="flex-1">Your Topic</TabsTrigger>
                    </TabsList>
                    <TabsContent value="suggestion">
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((suggestion, index) => (
                                <Button
                                    variant={suggestion === selectedTopic ? "default" : "outline"}
                                    key={index}
                                    className={`transition-all ${suggestion === selectedTopic ? 'bg-teal-600 hover:bg-teal-700' : 'border-slate-600 bg-slate-800/30'}`}
                                    onClick={() => {
                                        setSelectedTopic(suggestion)
                                        onHandleInputChange('topic', suggestion)
                                    }}
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="your_topic">
                        <div className="space-y-3">
                            <h2 className="font-medium">Enter your own topic</h2>
                            <Textarea
                                placeholder="Enter your topic"
                                className="bg-slate-800/50 border-slate-700 min-h-[100px]"
                                onChange={(event) => {
                                    onHandleInputChange('topic', event.target.value);
                                    setSelectedTopic(event.target.value)
                                }}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                {scripts?.length > 0 &&
                    <div className="mt-6 space-y-4">
                        <h2 className="font-semibold text-lg">Select the Script</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {scripts?.map((item, index) => (
                                <div key={index}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md
                                    ${selectedScriptIndex === index ? 'border-teal-500 bg-teal-900/20' : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'}`}
                                    onClick={() => {
                                        setSelectedScriptIndex(index);
                                        onHandleInputChange('script', item?.content)
                                    }}
                                >
                                    <h2 className="line-clamp-4 text-sm text-gray-300">{item.content}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>

            {!scripts &&
                <Button
                    className="mt-4 bg-teal-600 hover:bg-teal-700"
                    size="sm"
                    disabled={loading}
                    onClick={GenerateScript}
                >
                    {loading ?
                        <Loader2Icon className="animate-spin mr-2" /> :
                        <SparklesIcon className="mr-2" />
                    }
                    Generate Script
                </Button>
            }
        </div>
    )
}

export default Topic
