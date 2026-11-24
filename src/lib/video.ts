// Same conversion project.html uses for YouTube/Vimeo links.
export function youtubeToEmbed(url: string): string {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1].split('&')[0];
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    if (url.includes('youtube.com/embed/')) {
        return url.includes('?') ? `${url}&rel=0&modestbranding=1` : `${url}?rel=0&modestbranding=1`;
    }
    if (url.includes('vimeo.com')) {
        if (url.includes('player.vimeo.com/video/')) return url;
        const vimeoId = url.split('vimeo.com/')[1].split(/[/?]/)[0];
        return `https://player.vimeo.com/video/${vimeoId}`;
    }
    return url;
}

// Turns **bold** into <strong> for short frontmatter strings like summary items.
export function inlineMarkdown(text: string): string {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
