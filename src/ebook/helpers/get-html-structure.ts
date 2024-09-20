export const getHtmlStructure =
	(parameters: { file: string; picture: string; title: string }) =>
	({
		fontScript,
		defaultProperties
	}: {
		fontScript: string;
		defaultProperties: {
			scrollPosition: number;
			theme: string;
			reactions: {
				bookId: string;
				type: string;
				text: string;
				xpath: string;
				startOffset: number;
				endOffset: number;
			}[];
		};
	}) => `
	<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
				<title>${parameters.title}</title>
				<style>${fontScript}</style>
			</head>
			<style>${defaultProperties.theme}</style>
			
			<div style="margin-bottom: 40px; user-select: none;">
				<img style='width:100%; height: 300px; object-fit: contain; object-position: center; padding-top: 40px'
					 src="${parameters.picture}" alt="${parameters.title}"
					onerror="this.style.display='none';"
					  />
			</div>
			<div id="scroll-container">
				${parameters.file}
			</div>
		
			<script src="https://cdn.jsdelivr.net/npm/mark.js@8.11.1/dist/mark.min.js"  type="text/javascript" charset="utf-8" ></script>
			<script>
			 		
 					
						window.onload = function() {
						wrapReactionsInMarkTag(${JSON.stringify(defaultProperties.reactions)})
						window.scrollTo({
							top: ${defaultProperties.scrollPosition}
						 })
						window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
		}
</script>

`;
