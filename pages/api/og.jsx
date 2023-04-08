import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'edge',
};
 
export default async function () {
  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <div tw="bg-indigo-900 flex h-full">
          <div tw="flex flex-col  w-full py-12 px-4 md:items-center justify-center gap-3 p-8">
            <div tw="flex flex-col  font-bold tracking-tight text-gray-900 text-center">
              <div tw="text-white text-5xl text-center">Have a code problem?</div>
              <div tw="text-white text-4xl text-center">Find help on CodeMonger.</div>
              <div tw="text-white text-4xl text-center">always under construction...</div>
            </div>
            <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-400 px-5 py-3 text-base font-medium text-white"
                >
                  made with love @programmer_dex
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}