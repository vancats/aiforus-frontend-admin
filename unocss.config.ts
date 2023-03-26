import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],

    // normal
    ['cursor', 'cursor-pointer select-none'],

    // adapt
    ['layout', 'px-5vw sm:px-10vw md:px-15vw lg:px-20vw'],
    ['layout-content', 'layout relative rounded-t-3 bg-#F4F8FD'],

    ['main-title', 'text-center sm:text-left text-2xl sm:text-5xl sm:leading-14 text-white'],
    ['web-only', 'hidden sm:block'], // 移动端不展示
    ['mobile-only', 'block sm:hidden'], // 移动端不展示

    // Flex flex + align-items + justify-content + flex-direction
    ['flex-center', 'flex items-center'],
    ['flex-center-start', 'flex-center justify-center'],
    ['flex-center-between', 'flex-center justify-between'],
    ['flex-center-between-col', 'flex-center-between flex-col'],
    ['flex-wrap', 'flex flex-wrap'],

    ['tag', 'p-4 border rounded-lg cursor'],
  ],

  rules: [
    [/^wh-(.*)$/, ([, d]) => {
      // 先考虑这两个场景
      switch (d) {
        case 'full': d = '100%'
          break
        case 'screen': d = '100vw'
          break
      }
      if (d === 'full')
        d = '100%'
      if (isNaN(Number(d)))
        return { width: d, height: d }
      else
        return { width: `${Number(d) / 4}rem`, height: `${Number(d) / 4}rem` }
    }],
  ],

  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
    //   scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],

//   preflights: [
//     {
//       getCSS: () => `
//         .n-button {
//           background-color: var(--n-color);
//         }
//       `,
//     },
//   ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
