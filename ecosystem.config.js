module.exports = {
  apps: [
    {
      name: 'WEB RR (MAINTENANCE)',
      exec_mode: 'cluster',
      instances: '2', 
      max_memory_restart: '200M',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
