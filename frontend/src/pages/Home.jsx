import BannerCarousel from '../components/Banner'
import PromoGrid from '../components/PromoGrid'
import FlashSale from '../components/FlashSale'
import CategoryCarousel from '../components/CategorySlider'
import NewArrivals from '../components/NewArrival'
import GenderExclusiveBanner from '../components/ExclusiveBanner'

function Home() {
  return (
    <>
    <BannerCarousel/>
    <PromoGrid/>
    <FlashSale/>
    <CategoryCarousel/>
    <NewArrivals/>
    <GenderExclusiveBanner/>
    </>
  )
}

export default Home