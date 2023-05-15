import "../Stylesheets/App.scss";

function App() {
  return (
    <div className="App">
      <h1>Twitter Mockup by Adrien Surowiec</h1>
      <h2>Following this is a div that should become a tweet someday</h2>
      <div className="tweet">
        <h3>Author Name</h3>
        <p>
          This is his tweet that shouldn't be longer than 140 characters. It
          will say something that sounds clever.
        </p>
      </div>
    </div>
  );
}

export default App;
