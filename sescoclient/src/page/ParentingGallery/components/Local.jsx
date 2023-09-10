import './locallist.css'

const Local = ({clickedLocal, setClickedLocal}) => {

  return (
    <>
    <div class="cards-wrapper">
      <div class="card-grid-space">
        <a class="card">
          <div>
            <h1>HTML Syntax</h1>
            <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
            <div class="date">6 Oct 2017</div>
            <div class="tags">
              <div class="tag">HTML</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </>
  )
}

export default Local
