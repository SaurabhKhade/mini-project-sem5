import React, {
  createContext,
  useState,
  useEffect
} from 'react';

export default ContextProvider;
export const editorContext = createContext();
export const filesContext = createContext();
export const popupContext = createContext();
export const themeContext = createContext();

function EditorContext({children}) {
  const [config,setConfig] = useState(defaultConfig);
  useEffect(()=>{
    let saved = localStorage.getItem("editorConfig");
    if (saved) {
      saved = JSON.parse(saved);
      setConfig(saved);
    }
  },[]);
  
  return (
    <editorContext.Provider value={[config,setConfig]}>
      {children}
    </editorContext.Provider>
  );
}

function FilesContext({children}) {
  const [files,setFiles] = useState({});
  const [loadedFile,setLoadedFile] = useState(undefined);
  
  useEffect(()=>{
    let saved = localStorage.getItem("userFiles");
    if (saved) {
      saved = JSON.parse(saved);
      setFiles(saved);
    }
  },[]);
  
  return (
    <filesContext.Provider value={[files,setFiles,loadedFile,setLoadedFile]}>
      {children}
    </filesContext.Provider>
  );
}

function PopupContext({children}) {
  
  const control = useState(undefined);
  
  return (
    <popupContext.Provider value={control}>
      {children}
    </popupContext.Provider>
  );
}

function ThemeContext({children}) {
  const [theme,setTheme] = useState('dark');
  useEffect(()=>{
    let saved = localStorage.getItem("prefered-theme");
    if (saved) {
      setTheme(saved);
    }
  },[]);
  
  return (
    <themeContext.Provider value={[theme,setTheme]}>
      {children}
    </themeContext.Provider>
  );
}

function ContextProvider({children}) {
  return (
    <ThemeContext>
      <EditorContext>
        <FilesContext>
          <PopupContext>
            {children}  
          </PopupContext>
        </FilesContext>
      </EditorContext>
    </ThemeContext>
  )
}

const defaultConfig = {
  theme: "monokai",
  fontSize: 14,
  showGutter: true,
  highlightActiveLine: true,
  keyboardHandler: "vscode",
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  tabSize: 2,
  wrapEnabled: false,
  style: {
    fontFamily: 'Fira Code'
  }
};