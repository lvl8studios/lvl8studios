interface MarkdownProps {
    content: string
}

export function MarkdownRenderer({ content }: MarkdownProps) {
    // Simple markdown to HTML conversion
    const processMarkdown = (text: string): string => {
        return text
            // Headers
            .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold mb-4 mt-8">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mb-6 mt-10">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-8 mt-12">$1</h1>')
            
            // Bold and italic
            .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
            
            // Code blocks
            .replace(/```([\s\S]*?)```/gim, '<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code>$1</code></pre>')
            .replace(/`(.*?)`/gim, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
            
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary hover:underline">$1</a>')
            
            // Lists
            .replace(/^\- (.*$)/gim, '<li class="mb-2">$1</li>')
            .replace(/^(\d+)\. (.*$)/gim, '<li class="mb-2">$2</li>')
            
            // Paragraphs
            .replace(/\n\n/gim, '</p><p class="mb-4">')
            
            // Line breaks
            .replace(/\n/gim, '<br/>')
    }

    const htmlContent = processMarkdown(content)
    
    return (
        <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ 
                __html: `<p class="mb-4">${htmlContent}</p>` 
            }} 
        />
    )
}
