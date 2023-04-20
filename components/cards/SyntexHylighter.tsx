import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useState, useRef } from 'react';

import { BsClipboardPlus, BsDownload, BsFillSunFill } from 'react-icons/bs';
import { elementToPNG } from '../../lib/utils';


const codeString = "//export async function elementToPNG(element: HTMLElement): Promise<void> {}";
  

export default function SyntexHilight(code: any) {

    const highlightedCode = hljs.highlight(code.code, { language: 'typescript' }).value
    const [theme, setTheme] = useState(false)


    const [copied, setCopied] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    function handleConvertToPNG() {
    if (ref.current) {
        elementToPNG(ref.current)
        .then(() => {
            console.log('Image downloaded successfully.');
        })
        .catch(error => {
            console.error('Failed to download image:', error);
        });
    }
    }

    
  const copyToClipboard = (text: string): void => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    const selected = document.getSelection()?.rangeCount != undefined
        ? document.getSelection()?.getRangeAt(0)
        : false;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    if (selected) {
      document.getSelection()?.removeAllRanges();
      document.getSelection()?.addRange(selected);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };


    return (
        <div ref={ref}>
            <div className='flex justify-between items-center my-2 gap-2'>
                <button onClick={()=>setTheme(!theme)} className='flex items-center justify-center font-2xl p-2 w-full bg-[#081822] text-white rounded-lg'><BsFillSunFill /></button>
                <button className={`flex items-center justify-center font-2xl p-2 w-full ${copied?"bg-[#00c50c]":"bg-[#081822]"}  text-white rounded-lg`} onClick={()=>copyToClipboard(code.code)}><BsClipboardPlus /></button>
    
            </div>
            <pre  className={`overflow-x-scroll ${theme?"bg-[#d4d4d4]":"bg-[#081822]"} rounded-lg p-4 w-full`}>
                <code >
                    <div  dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                </code>
            </pre>
        </div>
    );
};