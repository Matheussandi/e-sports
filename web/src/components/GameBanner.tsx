interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
  handleClick: () => void;
}

export function GameBanner({ bannerUrl, title, adsCount, handleClick }: GameBannerProps) {
  return (
    <>
      <div className='relative rounded-lg overflow-hidden hover:cursor-pointer' onClick={handleClick}>
        <div className="max-h-48 sm:max-h-full ">
          <img src={bannerUrl} alt="" />
        </div>

        <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
          <strong className="font-bold text-white block">{title}</strong>
          <span className="text-zinc-300 text-sm block">{adsCount} anúncios</span>
        </div>
      </div>
    </>
  )
}