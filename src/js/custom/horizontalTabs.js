export default function horizontalTabs() {
  const containers = Array.from(document.querySelectorAll('.js-init-horizontal-scroll'));

  containers.forEach(container => {
    const tabWrappers = Array.from(container.querySelectorAll('.js-tab-btn-wrapper'));

    tabWrappers.forEach(wrapper => {
      const tab = wrapper.querySelector('.js-tab-btn');
      tab.addEventListener('click', () => {
        console.log('todo');
      })
    })
  })
}