import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import axios from 'axios'
import { Spin, Row, Col } from 'antd'
import styles from './DetailPage.module.css'
import { Header, Footer, ProductIntro } from '../../components'
import { DatePicker } from 'antd'
import { productDetailSlice } from '../../redux/productDetail/slice'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'

const { RangePicker } = DatePicker

interface MatchParams {
	touristRouteId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
	// const { touristRouteId } = useParams<MatchParams>()
	const loading = useSelector((state) => state.productDetail.loading)
	const error = useSelector((state) => state.productDetail.error)
	const product = useSelector((state) => state.productDetail.data)

	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			dispatch(productDetailSlice.actions.fetchStart())
			try {
				const { data } = await axios.get(
					`https://run.mocky.io/v3/5a108ca7-4c5f-4141-964b-e8200a57e40a`,
				)
				dispatch(productDetailSlice.actions.fetchSuccess(data))
			} catch (error) {
				dispatch(productDetailSlice.actions.fetchFail(error.message))
			}
		}
		fetchData()
	}, [])
	if (loading) {
		return (
			<Spin
				size="large"
				style={{
					marginTop: 200,
					marginBottom: 200,
					marginLeft: 'auto',
					marginRight: 'auto',
					width: '100%',
				}}
			/>
		)
	}
	if (error) {
		return <div>网站出错：{error}</div>
	}
	return (
		<>
			<Header />
			<div className={styles['page-content']}>
				{/* 产品简介 与 日期选择 */}
				<div className={styles['product-intro-container']}>
					<Row>
						<Col span={13}>
							<ProductIntro
								title={product.title}
								shortDescription={product.description}
								price={product.originalPrice}
								coupons={product.coupons}
								points={product.points}
								discount={product.price}
								rating={product.rating}
								pictures={product.touristRoutePictures.map((p) => p.url)}
							/>
						</Col>
						<Col span={11}>
							<RangePicker open style={{ marginTop: 20 }} />
						</Col>
					</Row>
				</div>
				{/* 锚点菜单 */}
				<div className={styles['product-detail-anchor']}></div>
				{/* 产品特色 */}
				<div id="feature" className={styles['product-detail-container']}></div>
				{/* 费用 */}
				<div id="fees" className={styles['product-detail-container']}></div>
				{/* 预订须知 */}
				<div id="notes" className={styles['product-detail-container']}></div>
				{/* 商品评价*/}
				<div id="comments" className={styles['product-detail-container']}></div>
			</div>
			<Footer />
		</>
	)
}
