// Vue 2.5's template compiler picks its nextTick scheduler when it is first loaded. On any
// Node with a global MessageChannel (Node 15+) it opens one, and that open channel keeps the
// build process alive forever after "Build complete", so a Netlify build would hang until it
// times out. Load the compiler once here with MessageChannel hidden, so it falls back to
// setTimeout, then put MessageChannel back for everything else. Node caches the module, so
// vue-loader uses this same instance. This only affects the build process, not the website.
const messageChannel = global.MessageChannel;
delete global.MessageChannel;
require('vue-template-compiler');
global.MessageChannel = messageChannel;

module.exports = {
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            // Dart Sass (the "sass" package). The original node-sass no longer installs on current Node.
            sass: { implementation: require('sass') }
        }
    }
}
