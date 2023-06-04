#!/usr/bin/env node

import { program } from 'commander'
import pkg from '../package.json'
import getRecipeData from '.'

const { name, description, version } = pkg

program.name(`npx ${name}`).version(version).allowExcessArguments(false).arguments('<url>').description(description, { url: 'food recipe url' }).action(async (url) => {
  try {
    console.log(await (getRecipeData(url)))
  }
  catch (err: unknown) {
    console.error((err as { message: string }).message)
    process.exit(1)
  }
})

program.parseAsync().catch((e: unknown) => {
  console.error((e as { message: string }).message)
  process.exit(1)
})
