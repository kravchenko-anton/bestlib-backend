export function optimizeFilename(filename: string) {
	// Split the filename and extension
	const [name, extension] = filename.split(/\.(?=[^.]+$)/)
	if (!name || !extension) return filename
	const optimizedName =
		name
			.replaceAll(/[^\s\w-]/g, '')
			.trim()
			.replaceAll(/\s+/g, '-')
			.replaceAll(/-+/g, '-') || 'file'

	// Combine the optimized filename and the original extension
	return `${optimizedName}.${extension}`
}
