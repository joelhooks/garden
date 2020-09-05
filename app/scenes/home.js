import * as React from 'react'

import Menu from '../components/Menu'

import useBreakpoint from '../hooks/useBreakpoint'
import noteModules from '../notes'

const notes = Object.values(noteModules)
import { useParams } from 'react-router-dom'

export default function HomeScene() {
  const [isClosed, setClosed] = React.useState(true)
  const isStatic = useBreakpoint('sm')
  
  const { slug } = useParams()

  console.log(notes)
  const {
    default: Note,
    title
  } = notes.find((noteModule) => noteModule.slug === slug) || {}
  
  const noteList = (
    <ul>
      { notes.map((noteModule) => (
        <li className="p-3">
          <a className="text-blue-500" href={`/notes/${noteModule.slug}`}> { noteModule.title } </a>
        </li>
      ))}
    </ul>
  )
  return Note ? (
    <Menu
      isStatic={isStatic}
      isClosed={isClosed}
      setClosed={setClosed}
      headerChildren={
        <div className="flex items-center justify-between flex-grow px-3">
          <h1 className="text-lg">{ title }</h1>
        </div>
      }
      sidebarChildren={
        <div className="relative flex-grow py-4 border-r">
          <nav>
            <ul>
              { noteList }
            </ul>
          </nav>
        </div>
      }
    >
      { Note && (
          <div class="p-4 max-w-6xl mx-auto">
            <article class="prose">
                <Note />
                <footer>
                  <a href={`https://github.com/jacobparis/garden/blob/master/app/notes/${slug}`}>
                    Edit this page on GitHub
                  </a>
                </footer>
            </article>
          </div>
        )
      }
    </Menu>
  ) : noteList
}
