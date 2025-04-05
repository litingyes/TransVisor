import type { Config } from 'tailwindcss'
import { setupInspiraUI } from '@inspira-ui/plugins'
import animate from 'tailwindcss-animate'

export default <Partial<Config>>{
  plugins: [animate, setupInspiraUI],
}
