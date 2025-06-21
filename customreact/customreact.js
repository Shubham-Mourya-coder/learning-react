const reactElement =

 {
    type: 'a',
    props: {
        href: "https://google.com",
        target: " _blank"
    },
    Children:'Click me to visit Google'
 }
 const mainContainer = document.querySelector('root');
 customRender(reactElement, mainContainer)