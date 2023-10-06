<script>
  export let name;
  export let size = "var(--icon-size)";
  export let color = "var(--text)";
  export let focusable = false;

  let icons = {
    refresh: {
      box: 24,
      svg: `
      <path d="M14 15L10 19L14 23" stroke="${color}" stroke-width="2"/>
      <path d="M5.93782 15.5C5.16735 14.1655 4.85875 12.6141 5.05989 11.0863C5.26102 9.55856 5.96064 8.13986 7.05025 7.05025C8.13986 5.96064 9.55856 5.26102 11.0863 5.05989C12.6141 4.85875 14.1655 5.16735 15.5 5.93782C16.8345 6.70829 17.8775 7.89757 18.4672 9.32122C19.0568 10.7449 19.1603 12.3233 18.7615 13.8117C18.3627 15.3002 17.4838 16.6154 16.2613 17.5535C15.0388 18.4915 13.5409 19 12 19" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      `,
    },
    question: {
      box: 24,
      svg: `
      <circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="2"/>
      <circle cx="12" cy="18" r="0.5" fill="${color}" stroke="${color}"/>
      <path d="M12 16V14.5811C12 13.6369 12.6042 12.7986 13.5 12.5V12.5C14.3958 12.2014 15 11.3631 15 10.4189V9.90569C15 8.30092 13.6991 7 12.0943 7H12C10.3431 7 9 8.34315 9 10V10" stroke="${color}" stroke-width="2"/>
      `,
    },
    left: {
      box: 24,
      svg: `
      <path d="M15 6L9 12L15 18" stroke="${color}" stroke-width="2"/>
      `,
    },
    right: {
      box: 24,
      svg: `
      <path d="M9 6L15 12L9 18" stroke="${color}" stroke-width="2"/>
      `,
    },
    doubleRight: {
      box: 24,
      svg: `
      <path d="M12 18L18 12L12 6" stroke="${color}" stroke-width="2"/>
      <path d="M6 18L12 12L6 6" stroke="${color}" stroke-width="2"/>
      `,
    },
    close: {
      box: 24,
      svg: `
      <path d="M18 6L6 18" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `,
    },
    search: {
      box: 24,
      svg: `
      <circle cx="11" cy="11" r="7" stroke="${color}" stroke-width="2"/>
      <path d="M20 20L17 17" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      `,
    },
    flip: {
      box: 24,
      svg: `
      <path d="M8 20L7.29289 20.7071L8 21.4142L8.70711 20.7071L8 20ZM8 12L7 12L8 12ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44771 10.5523 9 10 9L10 11ZM3.29289 16.7071L7.29289 20.7071L8.70711 19.2929L4.70711 15.2929L3.29289 16.7071ZM8.70711 20.7071L12.7071 16.7071L11.2929 15.2929L7.29289 19.2929L8.70711 20.7071ZM9 20L9 12L7 12L7 20L9 20ZM9 12C9 11.4477 9.44771 11 10 11L10 9C8.34315 9 7 10.3431 7 12L9 12Z" fill="${color}"/>
      <path d="M16 4L15.2929 3.29289L16 2.58579L16.7071 3.29289L16 4ZM16 12L17 12L16 12ZM14 15C13.4477 15 13 14.5523 13 14C13 13.4477 13.4477 13 14 13L14 15ZM11.2929 7.29289L15.2929 3.29289L16.7071 4.70711L12.7071 8.70711L11.2929 7.29289ZM16.7071 3.29289L20.7071 7.29289L19.2929 8.70711L15.2929 4.70711L16.7071 3.29289ZM17 4L17 12L15 12L15 4L17 4ZM17 12C17 13.6569 15.6569 15 14 15L14 13C14.5523 13 15 12.5523 15 12L17 12Z" fill="${color}"/>
      `,
    },
    burger: {
      box: 24,
      svg: `
      <path d="M5 7H19" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M5 12H19" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M5 17H19" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      `,
    },
    play: {
      box: 24,
      svg: `
      <path d="M16.1378 10.5689L9.60498 7.30252C8.40816 6.70411 7 7.5744 7 8.91249V15.0876C7 16.4257 8.40816 17.2959 9.60498 16.6975L16.1378 13.4311C17.3171 12.8415 17.3171 11.1586 16.1378 10.5689Z" fill="${color}"/>
      `,
    },
    sun: {
      box: 24,
      svg: `
      <circle cx="12" cy="12" r="3" stroke="${color}" stroke-width="2"/>
      <path d="M12 5V3" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 21V19" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M16.9498 7.05026L18.364 5.63605" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M5.63608 18.364L7.05029 16.9497" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M19 12L21 12" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M3 12L5 12" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M16.9498 16.9497L18.364 18.364" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M5.63608 5.63605L7.05029 7.05026" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      `,
    },
    moon: {
      box: 24,
      svg: `
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15 4C15.292 4 15.438 4 15.5781 4.04183C16.192 4.22522 16.4775 4.93111 16.1637 5.48976C16.0921 5.61719 15.8744 5.82779 15.4389 6.249C13.935 7.70352 13 9.74257 13 12C13 14.2574 13.935 16.2965 15.4389 17.751C15.8744 18.1722 16.0921 18.3828 16.1637 18.5102C16.4775 19.0689 16.192 19.7748 15.5781 19.9582C15.438 20 15.292 20 15 20C10.5817 20 7 16.4183 7 12C7 7.58172 10.5817 4 15 4Z" fill="${color}"/>
      `,
    },
    info: {
      box: 24,
      svg: `<circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="2"/>
      <path d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z" fill="${color}" stroke="${color}"/>
      <path d="M12 17V10" stroke="${color}" stroke-width="2"/>
      `,
    },
  };
  const displayIcon = icons[name];
</script>

<svg
  class={$$props.class}
  {focusable}
  fill="none"
  style={`width:${size}; height:${size}`}
  viewBox="0 0 {displayIcon.box} {displayIcon.box}"
  >{@html displayIcon.svg}</svg
>
