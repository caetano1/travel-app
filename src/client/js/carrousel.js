// Declares the functions that will allow the carroussel
// to work properly

// used as reference: https://www.w3schools.com/howto/howto_js_slideshow.asp

const changeImage = (pace = 0) => {
    let index
    const imgs = document.getElementsByClassName('image')
    // runs through the image objects to find the index of the current selected image
    for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].classList.contains('selected-image')) {
            index = i
            // removes class name from previous selected image
            imgs[i].classList.remove('selected-image');
        }
    }
    showImage(index += pace, imgs)
}

const showImage = (i, images) => {
    let index
    if (i < 0) index = images.length - 1 ;
    else if (i >= images.length) index = 0;
    else index = i;
    images[index].classList.add('selected-image');
}

export { changeImage, showImage }