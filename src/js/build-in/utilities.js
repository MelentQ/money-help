export function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export const monthPostfixes = ['месяц', 'месяца', 'месяцев'];

export function postfix(num, postfixes) {
    //Делим число без остатка на 100
    num = num % 100;

    //Если больше 19, делим его без остатка ещё раз, уже на 10
    if (num > 19)
    {
        num = num % 10;
    }

    //В зависимости от того, какие числа остались, возвращаем значения
    switch (num)
    {
        case 1:
            return postfixes[0];

        case 2: case 3: case 4:
            return postfixes[1];

        default:
            return postfixes[2];
    }
}

export function disableScroll() {
    let pagePosition = window.scrollY;
    lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
}

export function enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({
        top: pagePosition,
        left: 0
    });
    document.body.removeAttribute('data-position');
}

export function lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.style.paddingRight = paddingOffset;
}

export function unlockPadding() {
    document.body.style.paddingRight = '0px';
}