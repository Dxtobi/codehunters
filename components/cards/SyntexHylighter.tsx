import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useState } from 'react';

import { BsClipboardPlus, BsDownload, BsFillSunFill } from 'react-icons/bs';


const codeString = `export default function SyntexHilight({code}) {
    const codeString = '(num) => num + 1';
    return (
      <SyntaxHighlighter language="javascript" style={docco}>
        <div>
        </div>
      </SyntaxHighlighter>
    );
  };`;


export default function SyntexHilight({ code }) {
    const highlightedCode = hljs.highlight(codeString, { language: 'typescript' }).value
    const [theme, setTheme] = useState(true)




    return (
        <div>
            <div className='flex justify-between items-center my-2 gap-2'>
                <button onClick={()=>setTheme(!theme)} className='flex items-center justify-center font-2xl p-2 w-full bg-[#081822] text-white rounded-lg'><BsFillSunFill /></button>
                <button className='flex items-center justify-center font-2xl p-2 w-full bg-[#081822] text-white rounded-lg'><BsClipboardPlus /></button>
                <button className='flex items-center justify-center font-2xl p-2 w-full bg-[#081822] text-white rounded-lg'><BsDownload /></button>
            </div>
            <pre className={`overflow-x-scroll ${theme?"bg-[#d4d4d4]":"bg-[#081822]"} rounded-lg p-4`}>
                <code >
                    <div  dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                </code>
            </pre>
        </div>
    );
};