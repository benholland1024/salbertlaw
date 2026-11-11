// Vue 2.5's template compiler, which is loaded during the build, opens a MessageChannel
// for its nextTick whenever Node provides one (Node 15+). That open channel keeps the
// build process alive forever after "Build complete", so a Netlify build would hang until
// it times out. The build never needs MessageChannel, so remove it before the compiler
// loads. This only affects the build process, not the website.
delete global.MessageChannel;

module.exports = {
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            // Dart Sass (the "sass" package). The original node-sass no longer installs on current Node.
            sass: { implementation: require('sass') }
        }
    }
}
