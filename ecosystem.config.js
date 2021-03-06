module.exports = {
  apps: [
    {
      name: 'getData',
      script: 'server.js',
      node_args: '--max_old_space_size=4096',
      watch: [
        'app/**/*.js', 'config', 'server.js', 'app.js'
      ],
      ignore_watch: [],
      env: {
        'NODE_PATH': '.',
      },
    },
  ]
}
