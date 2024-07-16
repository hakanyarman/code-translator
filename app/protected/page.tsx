import DeployButton from '@/components/DeployButton';
import AuthButton from '@/components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import FetchDataSteps from '@/components/tutorial/FetchDataSteps';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-blue-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        {/* <Header /> */}
        {/* <main className="flex-1 flex flex-col gap-6"> */}
        {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2> */}
        {/* <FetchDataSteps /> */}
        {/* <div className="mt-6 text-center text-sm">
            <input
              className="mt-1 h-[24px] w-[280px] rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              type="password"
              placeholder="OpenAI API Key"
              value=""
            />
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <select className="h-[40px] w-[140px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200">
              <option value="gpt-3.5-turbo" selected="">
                GPT-3.5
              </option>
              <option value="gpt-4">GPT-4</option>
            </select>
            <button className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700">
              Translate
            </button>
          </div> */}

        {/* html copy */}
        {/* <main className="__className_44d352">
          <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
            <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
              <div className="text-4xl font-bold">AI Code Translator</div>
            </div>
            <div className="mt-6 text-center text-sm">
              <input
                className="mt-1 h-[24px] w-[280px] rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                type="password"
                placeholder="OpenAI API Key"
                defaultValue=""
              />
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <select className="h-[40px] w-[140px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200">
                <option value="gpt-3.5-turbo">GPT-3.5</option>
                <option value="gpt-4">GPT-4</option>
              </select>
              <button className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700">
                Translate
              </button>
            </div>
            <div className="mt-2 text-center text-xs">
              Enter some code and click "Translate"
            </div>
            <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
              <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
                <div className="text-center text-xl font-bold">Input</div>
                <select className="w-full rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200">
                  <option value="Assembly Language">Assembly Language</option>
                  <option value="Bash">Bash</option>
                  <option value="C">C</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="Clojure">Clojure</option>
                  <option value="COBOL">COBOL</option>
                  <option value="CoffeeScript">CoffeeScript</option>
                  <option value="CSS">CSS</option>
                  <option value="Dart">Dart</option>
                  <option value="Elixir">Elixir</option>
                  <option value="Fortran">Fortran</option>
                  <option value="Go">Go</option>
                  <option value="Groovy">Groovy</option>
                  <option value="Haskell">Haskell</option>
                  <option value="HTML">HTML</option>
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="JSX">JSX</option>
                  <option value="Julia">Julia</option>
                  <option value="Kotlin">Kotlin</option>
                  <option value="Lisp">Lisp</option>
                  <option value="Lua">Lua</option>
                  <option value="Matlab">Matlab</option>
                  <option value="Natural Language">Natural Language</option>
                  <option value="NoSQL">NoSQL</option>
                  <option value="Objective-C">Objective-C</option>
                  <option value="Pascal">Pascal</option>
                  <option value="Perl">Perl</option>
                  <option value="PHP">PHP</option>
                  <option value="PL/SQL">PL/SQL</option>
                  <option value="Powershell">Powershell</option>
                  <option value="Python">Python</option>
                  <option value="R">R</option>
                  <option value="Racket">Racket</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Rust">Rust</option>
                  <option value="SAS">SAS</option>
                  <option value="Scala">Scala</option>
                  <option value="SQL">SQL</option>
                  <option value="Swift">Swift</option>
                  <option value="SwiftUI">SwiftUI</option>
                  <option value="TSX">TSX</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Visual Basic .NET">Visual Basic .NET</option>
                  <option value="Vue">Vue</option>
                </select>
                <div className="relative">
                  <button className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]">
                    Copy
                  </button>
                  <div className="cm-theme">
                    <div className="cm-editor ͼ1 ͼ3 ͼ4 ͼ29 ͼo">
                      <div
                        aria-live="polite"
                        style={{ position: 'fixed', top: '-10000px' }}
                      />
                      <div tabIndex={-1} className="cm-scroller">
                        <div
                          className="cm-gutters"
                          aria-hidden="true"
                          style={{ minHeight: '26.2px', position: 'sticky' }}
                        >
                          <div className="cm-gutter cm-lineNumbers">
                            <div
                              className="cm-gutterElement"
                              style={{
                                height: 0,
                                visibility: 'hidden',
                                pointerEvents: 'none',
                              }}
                            >
                              9
                            </div>
                            <div
                              className="cm-gutterElement cm-activeLineGutter"
                              style={{ height: '18.2px', marginTop: 4 }}
                            >
                              1
                            </div>
                          </div>
                          <div className="cm-gutter cm-foldGutter">
                            <div
                              className="cm-gutterElement"
                              style={{
                                height: 0,
                                visibility: 'hidden',
                                pointerEvents: 'none',
                              }}
                            >
                              <span title="Unfold line">›</span>
                            </div>
                            <div
                              className="cm-gutterElement cm-activeLineGutter"
                              style={{ height: '18.2px', marginTop: 4 }}
                            />
                          </div>
                        </div>
                        <div
                          spellCheck="false"
                          autoCorrect="off"
                          autoCapitalize="off"
                          translate="no"
                          contentEditable="true"
                          className="cm-content"
                          style={{ tabSize: 4 }}
                          role="textbox"
                          aria-multiline="true"
                          data-language="go"
                          aria-autocomplete="list"
                        >
                          <div className="cm-activeLine cm-line">
                            <br />
                          </div>
                        </div>
                        <div
                          className="cm-layer cm-layer-above cm-cursorLayer"
                          aria-hidden="true"
                          style={{ zIndex: 150, animationDuration: '1200ms' }}
                        >
                          <div
                            className="cm-cursor cm-cursor-primary"
                            style={{
                              left: '35.15px',
                              top: '4.79999px',
                              height: '15.2px',
                            }}
                          />
                        </div>
                        <div
                          className="cm-layer cm-selectionLayer"
                          aria-hidden="true"
                          style={{ zIndex: -2 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
                <div className="text-center text-xl font-bold">Output</div>
                <select className="w-full rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200">
                  <option value="Assembly Language">Assembly Language</option>
                  <option value="Bash">Bash</option>
                  <option value="C">C</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="Clojure">Clojure</option>
                  <option value="COBOL">COBOL</option>
                  <option value="CoffeeScript">CoffeeScript</option>
                  <option value="CSS">CSS</option>
                  <option value="Dart">Dart</option>
                  <option value="Elixir">Elixir</option>
                  <option value="Fortran">Fortran</option>
                  <option value="Go">Go</option>
                  <option value="Groovy">Groovy</option>
                  <option value="Haskell">Haskell</option>
                  <option value="HTML">HTML</option>
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="JSX">JSX</option>
                  <option value="Julia">Julia</option>
                  <option value="Kotlin">Kotlin</option>
                  <option value="Lisp">Lisp</option>
                  <option value="Lua">Lua</option>
                  <option value="Matlab">Matlab</option>
                  <option value="Natural Language">Natural Language</option>
                  <option value="NoSQL">NoSQL</option>
                  <option value="Objective-C">Objective-C</option>
                  <option value="Pascal">Pascal</option>
                  <option value="Perl">Perl</option>
                  <option value="PHP">PHP</option>
                  <option value="PL/SQL">PL/SQL</option>
                  <option value="Powershell">Powershell</option>
                  <option value="Python">Python</option>
                  <option value="R">R</option>
                  <option value="Racket">Racket</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Rust">Rust</option>
                  <option value="SAS">SAS</option>
                  <option value="Scala">Scala</option>
                  <option value="SQL">SQL</option>
                  <option value="Swift">Swift</option>
                  <option value="SwiftUI">SwiftUI</option>
                  <option value="TSX">TSX</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Visual Basic .NET">Visual Basic .NET</option>
                  <option value="Vue">Vue</option>
                </select>
                <div className="relative">
                  <button className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]">
                    Copy
                  </button>
                  <div className="cm-theme">
                    <div className="cm-editor ͼ1 ͼ3 ͼ4 ͼ2d ͼo">
                      <div
                        aria-live="polite"
                        style={{ position: 'fixed', top: '-10000px' }}
                      />
                      <div tabIndex={-1} className="cm-scroller">
                        <div
                          className="cm-gutters"
                          aria-hidden="true"
                          style={{ minHeight: '26.2px', position: 'sticky' }}
                        >
                          <div className="cm-gutter cm-lineNumbers">
                            <div
                              className="cm-gutterElement"
                              style={{
                                height: 0,
                                visibility: 'hidden',
                                pointerEvents: 'none',
                              }}
                            >
                              9
                            </div>
                            <div
                              className="cm-gutterElement cm-activeLineGutter"
                              style={{ height: '18.2px', marginTop: 4 }}
                            >
                              1
                            </div>
                          </div>
                          <div className="cm-gutter cm-foldGutter">
                            <div
                              className="cm-gutterElement"
                              style={{
                                height: 0,
                                visibility: 'hidden',
                                pointerEvents: 'none',
                              }}
                            >
                              <span title="Unfold line">›</span>
                            </div>
                            <div
                              className="cm-gutterElement cm-activeLineGutter"
                              style={{ height: '18.2px', marginTop: 4 }}
                            />
                          </div>
                        </div>
                        <div
                          spellCheck="false"
                          autoCorrect="off"
                          autoCapitalize="off"
                          translate="no"
                          contentEditable="false"
                          className="cm-content"
                          style={{ tabSize: 4 }}
                          role="textbox"
                          aria-multiline="true"
                          data-language="go"
                          aria-autocomplete="list"
                        >
                          <div className="cm-activeLine cm-line">
                            <br />
                          </div>
                        </div>
                        <div
                          className="cm-layer cm-layer-above cm-cursorLayer"
                          aria-hidden="true"
                          style={{ zIndex: 150, animationDuration: '1200ms' }}
                        >
                          <div
                            className="cm-cursor cm-cursor-primary"
                            style={{
                              left: '35.15px',
                              top: '4.79999px',
                              height: '15.2px',
                            }}
                          />
                        </div>
                        <div
                          className="cm-layer cm-selectionLayer"
                          aria-hidden="true"
                          style={{ zIndex: -2 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main> */}
        {/* html copy */}
      </div>

      {/* <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer> */}
    </div>
  );
}
