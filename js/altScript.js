const viewport = document.getElementById("scrollViewport");
const thumb = document.getElementById("scrollThumb");
const track = document.getElementById("scrollTrack");

function updateThumb() {
    if (!viewport || !thumb || !track) return;

    const scrollTop = viewport.scrollTop;
    const scrollHeight = viewport.scrollHeight - viewport.clientHeight;

    const trackHeight = track.clientHeight;
    const thumbHeight = thumb.offsetHeight;

    const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

    const maxY = trackHeight - thumbHeight;
    thumb.style.transform = `translateY(${ratio * maxY}px)`;
}

viewport.addEventListener("scroll", updateThumb);
window.addEventListener("resize", updateThumb);

updateThumb();

let isDragging = false;

thumb.addEventListener("mousedown", () => {
    isDragging = true;
    document.body.style.userSelect = "none";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const rect = track.getBoundingClientRect();
    const y = e.clientY - rect.top;

    const thumbHeight = thumb.offsetHeight;
    const maxY = track.clientHeight - thumbHeight;

    const clampedY = Math.max(0, Math.min(y, maxY));

    const ratio = clampedY / maxY;

    const scrollMax = viewport.scrollHeight - viewport.clientHeight;
    viewport.scrollTop = ratio * scrollMax;

    thumb.style.transform = `translateY(${clampedY}px)`;
});