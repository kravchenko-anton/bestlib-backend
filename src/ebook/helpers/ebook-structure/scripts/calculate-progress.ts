export const calculateProgress = `
  let currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  let chapters = document.querySelectorAll('section');
  
  chapters = Array.from(chapters).filter(chapter => chapter.id); // Filter out sections without an ID
  
  let currentChapterProgress = 0;
  let currentChapter = 0;
  let currentChapterLink = '';
  let currentChapterTitle = '';
  
  for (let index = 0; index < chapters.length; index++) {
    const chapter = chapters[index];
    const chapterStart = chapter.offsetTop;
    const chapterEnd = chapterStart + chapter.clientHeight;
    const chapterProgress = ((currentScrollPosition - chapterStart) / (chapterEnd - chapterStart)) * 100;
    const chapterTitle = chapter.getAttribute('data-title') || ''; // Default to empty string if no title
    
    if (chapterProgress >= 0 && chapterProgress <= 100) {
      currentChapterProgress = chapterProgress;
      currentChapterTitle = chapterTitle;
      currentChapter = index;
      currentChapterLink = chapter.id;
      break; // Exit the loop as soon as we find the active chapter
    }
  }

  window.ReactNativeWebView.postMessage(JSON.stringify({
    type: 'scroll',
    payload: {
      scrollTop: currentScrollPosition,
      progress: (currentScrollPosition / (document.body.scrollHeight - document.documentElement.clientHeight) * 100),
      chapter: {
        chapterLink: currentChapterLink,
        chapterProgress: currentChapterProgress,
        chapterTitle: currentChapterTitle
      }
    }
  }));
`;

export const scrollCalculateProgress = `
  let timerId;

  window.addEventListener('scroll', function() {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      ${calculateProgress}
    }, 700); // Adjust the delay based on performance needs
  });
`;
