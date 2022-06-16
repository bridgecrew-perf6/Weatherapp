export const Second = ({data, Cloudy, Sunny, setCurrent})=>{

   return <>
    {   data.map((item) => (
                <div className="databox" onClick={()=>{
                    setCurrent(item.temp.max)
                }}>
                  <b>{item.day}</b>
                  <br />
                  <b>
                    {item.temp.max}° {item.temp.min}°{" "}
                  </b>
                  <br />
                  <img
                    className="imgsetting"
                    src={item.clouds >= 50 ? Cloudy : Sunny}
                    alt=""
                  />
                  <br />
                  {item.clouds >= 50 ? <b>Cloudy </b> : <b>Clear</b>}
                </div>
              ))
}
   </>
}