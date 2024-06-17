import { PropsIcon } from '../../types'

const Deer: React.FC<PropsIcon> = ({ activo }) => {
	return (
		<svg
			width="18"
			height="22"
			viewBox="0 0 18 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3.04422 0L2.2227 0.207937C2.70235 1.75591 3.36059 2.56918 4.11067 2.99429C4.87096 3.42865 5.74861 3.46561 6.7079 3.38706C7.98356 3.28078 9.4225 2.94346 10.8921 3.43789C11.2901 3.59962 11.7085 3.80524 12.1524 4.07787C12.3871 4.01318 12.5912 3.93001 12.7953 3.86994C12.7953 3.86994 12.9586 3.3963 12.6933 2.79098C12.4637 2.25958 11.8922 1.58956 10.4481 1.11824L10.1624 1.83909C11.0502 2.13482 11.5299 2.49986 11.7748 2.84642C11.8105 2.89725 11.836 2.94346 11.8615 2.98967C11.6676 2.89725 11.4686 2.81408 11.2747 2.74939C9.84091 2.14868 8.69282 2.11171 7.77435 2.0193C7.2845 1.97309 6.87119 1.91764 6.52931 1.69584C6.18744 1.46942 5.93231 1.07665 5.71289 0.39277L4.89647 0.609948C5.18732 1.51563 5.57512 2.01468 6.02926 2.31503C6.23336 2.44903 6.45277 2.54607 6.68749 2.61538C5.88128 2.65466 5.12099 2.64634 4.5597 2.34276C3.93718 1.98695 3.44223 1.28459 3.04422 0ZM7.61107 0.16635C7.56514 0.683881 7.6672 1.10438 7.83558 1.44632C8.22848 1.49068 8.57036 1.49715 8.92754 1.5526C8.652 1.27535 8.40708 0.850231 8.4581 0.221799L7.61107 0.16635ZM13.7495 0.79016L13.1933 1.36776C13.6117 1.70046 13.7291 2.09785 13.7291 2.43517C13.5046 2.25404 13.3005 2.13343 13.0607 2.02392C13.4281 2.41299 13.4791 3.10334 13.5046 3.47486L14.2955 3.55341C14.2955 3.55341 15.1936 1.92688 13.7495 0.79016ZM9.6317 3.9947C8.73875 4.08711 8.2642 3.87456 7.97846 4.63237C7.97846 4.63237 8.93775 5.92158 11.4942 5.88923C11.3513 6.41601 11.4176 6.80416 11.4176 7.27086C11.4176 8.82345 10.0399 10.1774 7.00385 10.1774C5.46286 10.1774 3.5902 10.4269 2.16147 11.1246C1.14605 11.6191 0.35157 12.3353 0 13.3288L0.398514 13.8324L1.16136 13.8417V16.6927L0.230639 18.0004L0.498016 21.7895H1.38077L1.45731 18.7397C1.89613 18.5087 2.90135 17.908 3.75859 16.9838C4.92199 15.7408 5.81494 13.9341 4.76381 11.6976L5.54961 11.3973C6.41195 13.2317 6.1109 14.8213 5.35571 16.1012C6.79975 16.0597 8.03969 15.9765 9.09083 15.8194L8.851 13.2179L9.69804 13.1532L10.5043 21.7895H11.3819L11.5299 16.1659C12.2289 15.8979 13.821 14.9137 14.5659 11.4943C14.6578 11.0784 14.7088 10.7272 14.7343 10.4269C14.8517 9.66444 14.918 8.80497 14.9384 7.82536L13.6883 7.46955H17.5306L17.903 6.70712C17.5408 6.72098 17.107 6.55001 17.107 6.55001L17.1938 6.18035H18L13.6373 4.13332C13.1525 4.29967 12.6423 4.51685 12.2851 4.78024C11.9993 4.5954 11.0094 4.0178 9.6317 3.9947ZM14.5047 14.4655C14.0098 15.3018 13.4791 15.9257 13.0198 16.3693L15.4232 17.3304L14.3567 19.5253L15.1221 19.8487L16.8264 16.8544L14.5659 15.1263C14.5455 15.02 14.52 14.812 14.5047 14.4655ZM6.65688 16.8129C6.08028 16.8452 5.46797 16.8683 4.81483 16.8775C4.3709 17.4089 3.86064 17.9218 3.32997 18.3192L3.7739 21.7849H4.64645V18.7813C5.01894 18.5041 5.917 17.7971 6.65688 16.8129Z"
				fill={activo ? '#17c964' : 'white'}
			/>
		</svg>
	)
}

export default Deer
