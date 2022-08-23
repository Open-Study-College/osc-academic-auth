import type { EmotionCache } from '@emotion/cache';
import { useEffect, useContext } from 'react';
import { ServerStyleContext, ClientStyleContext } from '~/context';

export const useEmotionCache = (emotionCache: EmotionCache) => {
    const serverStyleData = useContext(ServerStyleContext) ?? [];

    // commented out --  const clientStyleData = useContext(ClientStyleContext);
    useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
        // re-link sheet container
        emotionCache.sheet.container = document.head;

        const tags = emotionCache.sheet.tags;
        emotionCache.sheet.flush();
        tags.forEach((tag: HTMLElement) => {
            // commented out -- (emotionCache.sheet as any)._insertTag(tag);
            document.head.prepend(tag);
        });
        // reset cache to reapply global styles
        // commented out - clientStyleData?.reset();
    }, [emotionCache.sheet]);

    return serverStyleData;
};
