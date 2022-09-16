import '../../index.scss'

export const withAltrone = (Component, config) => (props) => {
  console.log('withAltrone', config);

  return <div className='altrone'>
    <Component {...props} />
  </div>
}