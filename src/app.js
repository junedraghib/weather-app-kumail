const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
//Define Path for express config
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Set handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'Kumail'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Kumail'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        help:'How may i help u!!!!!!!',
        title:'Help',
        name:'Kumail'
    })
})


app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'Provide the address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
           return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
    title: '404',
    name: 'Kumail',
    errorMessage: 'Help page not found'
    })
   })


app.get('*', (req, res) => {
    res.render('404', {
    title: '404',
    name: 'Kumail',
    errorMessage: 'Page not found.'
    })
   })


app.listen(3000,() =>{
    console.log('Server has Started at 3000')
})