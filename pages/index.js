import Page from 'components/page'
import Footer from 'components/footer'
import DownloadButton from 'components/download-button'
import { Download, LogoBig } from 'components/icons'
import heroStyles from 'styles/pages/home/hero.module.css'
import contentStyles from 'styles/pages/home/content.module.css'
import installationStyles from 'styles/pages/home/installation.module.css'
import useOs from 'lib/use-os'
import Terminal from 'components/terminal'

function Path({ os, path }) {
  return (
    <code>
      {`${
        os === 'mac'
          ? '~/Library/Application Support/Hyper/'
          : os === 'windows'
          ? '$Env:AppData/Hyper/'
          : os === 'linux'
          ? '~/.config/Hyper/'
          : ''
      }${path}`}
    </code>
  )
}

function PathLink({ os, path, type }) {
  return (
    <a href={`#${type}-location`}>
      <Path os={os} path={path} />
    </a>
  )
}

const installationTableData = [
  {
    os: 'mac',
    renderText: () => (
      <>
        <b>macOS</b> (.app)
      </>
    ),
    path: 'mac',
    arm64Path: 'mac_arm64',
  },
  {
    os: 'windows',
    renderText: () => (
      <>
        <b>Windows</b> (.exe)
      </>
    ),
    path: 'win',
  },
  {
    os: 'ubuntu',
    renderText: () => (
      <>
        <b>Debian</b> (.deb)
      </>
    ),
    path: 'deb',
    arm64Path: 'deb_arm64',
  },
  {
    os: 'fedora',
    renderText: () => (
      <>
        <b>Fedora</b> (.rpm)
      </>
    ),
    path: 'rpm',
    arm64Path: 'rpm_arm64',
  },
  {
    os: 'linux',
    renderText: () => (
      <>
        <b>More Linux distros</b> (.AppImage)
      </>
    ),
    path: 'AppImage',
    arm64Path: 'AppImage_arm64',
  },
]

export async function getStaticProps() {
  const res = await fetch(
    'https://api.github.com/repos/vercel/hyper/releases/latest'
  )
  const latestRelease = await res.json()

  return {
    props: {
      latestRelease,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default function HomePage({ latestRelease }) {
  const os = useOs()

  return (
    <Page>
      {/**
       * Hero
       */}
      <div className={heroStyles.root}>
        <LogoBig className={heroStyles.logo} />
        <div className={heroStyles.terminal}>
          <Terminal />
        </div>
        <div className={heroStyles.download}>
          <DownloadButton fixedWidth os={os} />
          <a className={heroStyles.other} href="#installation">
            View other platforms
          </a>
        </div>
      </div>

      {/**
       * Content
       */}
      <div className={contentStyles.root} id="content">
        {/**
         * Installation
         */}
        <h2 className={installationStyles.title} id="installation">
          <a href="#installation">Installation</a>
        </h2>
        <span>latest version: {latestRelease.tag_name}</span>

        {/**
         * Extensions API
         */}
        <h2 id="extensions-api">
          <a href="#extensions-api">Extensions API</a>
        </h2>
        <p>
          Extensions are universal Node.js modules loaded by both Electron and
          the renderer process.
        </p>
        <p>
          The extension system is designed around <b>composition</b> of the APIs
          we use to build the terminal: <code>React</code> components and{' '}
          <code>Redux</code> actions.
        </p>
        <p>
          Instead of exposing a custom API method or parameter for every
          possible customization point, we allow you to intercept and compose
          every bit of functionality!
        </p>
        <p>
          The only knowledge that is therefore required to successfully extend{' '}
          <code>Hyper</code> is that of its underlying open source libraries.
        </p>
        <p>
          You can find additional details about plugin development{' '}
          <a href="https://github.com/vercel/hyper/blob/master/PLUGINS.md">
            in the Hyper repository
          </a>
          .
        </p>
        <p>Your module has to expose at least one of these methods:</p>
      </div>

      <Footer />

      <style jsx>{`
        .table {
          overflow-x: auto;
        }

        .table:not(:last-child) > table {
          margin: 48px 0;
        }

        .table > table {
          min-width: 500px;
        }

        .table.large {
          width: 900px;
          max-width: 100vw;
          margin-left: -100px;
        }

        .table.large > table {
          width: 900px;
          max-width: 100%;
        }

        #content table thead td {
          color: var(--gray);
          font-size: 12px;
          text-transform: uppercase;
        }

        #content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          table-layout: fixed;
        }

        #content table p {
          margin-bottom: 0;
        }

        #content table p:not(:last-child) {
          margin-bottom: 1rem;
        }

        #content table table.params {
          display: flex;
        }

        #content table table.params tr {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        #content table table.params tr:not(:last-child) {
          margin-bottom: 1rem;
        }

        #content table table.params tbody td {
          width: 100%;
          border-color: transparent;
          padding: 0;
          color: var(--gray);
        }

        #content table td > * + table.params {
          margin-top: 24px;
        }

        #content td > table {
          margin: 0;
        }

        #content table td {
          vertical-align: top;
          border: 1px solid #444;
          position: relative;
          word-break: break-word;
        }

        #content #config-paths-table td {
          padding: 10px;
        }

        #content #config-paths-table td:not(:first-child) {
          text-align: center;
          width: 66.67%;
        }

        #content #config-paths-table {
          color: #fff;
          margin-top: 0;
        }

        #content #plugins-paths-table td {
          padding: 10px;
        }

        #content #plugins-paths-table td:not(:first-child) {
          text-align: center;
          width: 66.67%;
        }

        #content #plugins-paths-table {
          color: #fff;
          margin-top: 0;
        }

        #content td.soon {
          color: #555;
        }

        #content thead td {
          padding: 10px 24px;
        }

        #content tbody td {
          padding: 24px;
        }

        #content table.config td:nth-child(1),
        #content table.api td:nth-child(1) {
          width: 30%;
          color: var(--gray);
        }

        #content table.config td:nth-child(2),
        #content table.api td:nth-child(2) {
          width: 23%;
          color: var(--gray);
        }

        #content table.config tbody td:first-child {
          color: var(--fg);
        }

        #content table.api tbody td:first-child {
          color: var(--fg);
        }

        #content table.api > tbody > tr > td:nth-child(2) {
          width: 13%;
        }

        #content td > p:first-child {
          margin-top: 0;
        }

        @media screen and (max-width: 900px) {
          .table.large {
            width: 100%;
            max-width: 100%;
            margin-left: 0;
          }

          .table tr td:nth-child(2) {
            display: none;
          }
        }

        @media screen and (max-width: 800px) {
          #content table {
            margin-left: 0;
            margin-right: 0;
          }
        }

        @media screen and (max-width: 700px) {
          #content {
            padding: 20px;
          }

          #content h2 {
            margin-top: 0;
          }

          #content h2:first-child {
            padding-top: 0;
          }

          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow: auto;
          }

          #content table {
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 20px;
          }

          #content .table-note:after {
            margin: 15px 0;
            content: 'Please note: the complete table information is available in bigger resolutions!';
            display: block;
            color: var(--gray);
          }
        }
      `}</style>
    </Page>
  )
}
