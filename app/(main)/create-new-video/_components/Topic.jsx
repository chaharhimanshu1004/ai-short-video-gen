import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon, SparklesIcon, TypeIcon, BookIcon, FlameIcon } from 'lucide-react'
import axios from 'axios'
import { useAuthContext } from '@/app/provider'
import toast from 'react-hot-toast'
import { cn } from "@/lib/utils"

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
        <div className="space-y-6">
            <div className="transition-all duration-200 hover:translate-y-px">
                <h2 className="text-xl font-semibold mb-3 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-cyan-100">
                    <TypeIcon className="w-5 h-5 mr-2 text-teal-400" /> 
                    Project Title
                </h2>
                <Input
                    placeholder="Enter project title"
                    className="bg-black/40 border-gray-800 focus:border-teal-500/70 focus:ring-1 focus:ring-cyan-600/40 rounded-xl transition-all placeholder:text-gray-500"
                    onChange={(event) => {
                        onHandleInputChange('title', event?.target.value);
                    }}
                />
            </div>

            <div className="transition-all duration-200">
                <h2 className="text-xl font-semibold mb-2 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-cyan-100">
                    <BookIcon className="w-5 h-5 mr-2 text-teal-400" />
                    Video Topic
                </h2>
                <p className="text-sm text-gray-400 mb-3">Select topic for your video</p>

                <Tabs defaultValue="suggestion" className="w-full">
                    <TabsList className="w-full mb-5 bg-gray-900/50 rounded-xl border border-gray-800 backdrop-blur-sm">
                        <TabsTrigger value="suggestion" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500/20 data-[state=active]:to-cyan-600/20 data-[state=active]:border data-[state=active]:border-teal-500/30 data-[state=active]:text-white transition-all rounded-lg">Suggestions</TabsTrigger>
                        <TabsTrigger value="your_topic" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500/20 data-[state=active]:to-cyan-600/20 data-[state=active]:border data-[state=active]:border-teal-500/30 data-[state=active]:text-white transition-all rounded-lg">Your Topic</TabsTrigger>
                    </TabsList>
                    <TabsContent value="suggestion" className="animate-in fade-in-50 duration-300">
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((suggestion, index) => (
                                <Button
                                    variant={suggestion === selectedTopic ? "default" : "outline"}
                                    key={index}
                                    className={cn(
                                        "transition-all duration-200 rounded-xl",
                                        suggestion === selectedTopic 
                                            ? "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-0 shadow-lg shadow-teal-900/20" 
                                            : "border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 hover:border-gray-700 text-gray-300"
                                    )}
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
                    <TabsContent value="your_topic" className="animate-in fade-in-50 duration-300">
                        <div className="space-y-3">
                            <h2 className="font-medium text-gray-300">Enter your own topic</h2>
                            <Textarea
                                placeholder="Enter your topic"
                                className="bg-gray-900/50 backdrop-blur-sm border-gray-800 focus:border-teal-500/70 focus:ring-1 focus:ring-cyan-600/40 min-h-[120px] rounded-xl transition-all placeholder:text-gray-500 resize-none hover:border-gray-700"
                                onChange={(event) => {
                                    onHandleInputChange('topic', event.target.value);
                                    setSelectedTopic(event.target.value)
                                }}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                {scripts?.length > 0 &&
                    <div className="mt-8 space-y-4 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                        <h2 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-cyan-100 flex items-center">
                            <SparklesIcon className="w-5 h-5 mr-2 text-teal-400" />
                            Select the Script
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {scripts?.map((item, index) => (
                                <div key={index}
                                    className={cn(
                                        "p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg group",
                                        selectedScriptIndex === index 
                                            ? "bg-gradient-to-r from-teal-500/20 to-cyan-600/20 border border-teal-500/30 shadow-lg shadow-teal-900/10" 
                                            : "border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 hover:border-gray-700"
                                    )}
                                    onClick={() => {
                                        setSelectedScriptIndex(index);
                                        onHandleInputChange('script', item?.content)
                                    }}
                                >
                                    <h2 className="line-clamp-4 text-sm text-gray-300 group-hover:text-white">{item.content}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>

            {!scripts &&
                <Button
                    className="mt-6 bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 hover:to-cyan-700 text-white border-0 rounded-xl shadow-lg shadow-teal-900/20 transition-all duration-300 font-medium hover:shadow-teal-900/30 hover:translate-y-px"
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