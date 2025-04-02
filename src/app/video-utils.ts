export function extractVideoId(url: string): { id: string, type: 'youtube' | 'vimeo' | null } {
   let videoId = '';
   let type: 'youtube' | 'vimeo' | null = null;

   // Xử lý YouTube
   const youtubeMatch = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?\/\s]{11})/);
   if (youtubeMatch) {
      videoId = youtubeMatch[1];
      type = 'youtube';
   }

   // Xử lý Vimeo
   const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
   if (vimeoMatch) {
      videoId = vimeoMatch[1];
      type = 'vimeo';
   }

   return { id: videoId, type };
}
