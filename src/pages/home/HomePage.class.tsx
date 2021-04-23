import React from 'react'
import {
	Header,
	Footer,
	Carousel,
	SideMenu,
	ProductCollection,
} from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import { productList1, productList2, productList3 } from './mockups'
import styles from './HomePage.module.css'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from 'axios'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import {
	fetchRecommendProductStartActionCreator,
	fetchRecommendProductSuccessActionCreator,
	fetchRecommendProductFailActionCreator,
} from '../../redux/recommendProducts/recommendProductsActions'

const mapStateToProps = (state: RootState) => {
	return {
		loading: state.recommendProducts.loading,
		error: state.recommendProducts.error,
		productList: state.recommendProducts.productList,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStart: () => {
			dispatch(fetchRecommendProductStartActionCreator())
		},
		fetchSuccess: (data) => {
			dispatch(fetchRecommendProductSuccessActionCreator(data))
		},
		fetchFail: (error) => {
			dispatch(fetchRecommendProductFailActionCreator(error))
		},
	}
}

type PropsType = WithTranslation &
	ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {
	async componentDidMount() {
		this.props.fetchStart()
		try {
			const { data } = await axios.get(
				'https://jsonplaceholder.cypress.io/posts',
			)
			const dataList = data.splice(0, 9)
			this.props.fetchSuccess(dataList)
		} catch (error) {
			this.props.fetchFail(error.message)
		}
	}

	render() {
		const { t, loading, error } = this.props
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
			return <div>网站错误：{error}</div>
		}
		return (
			<>
				<Header />
				{/* 页面内容 content */}
				<div className={styles['page-content']}>
					<Row style={{ marginTop: 20 }}>
						<Col span={6}>
							<SideMenu />
						</Col>
						<Col span={18}>
							<Carousel />
						</Col>
					</Row>
					<ProductCollection
						title={
							<Typography.Title level={3} type="warning">
								{t('home_page.hot_recommended')}
							</Typography.Title>
						}
						sideImage={sideImage}
						products={productList1}
					/>
					<ProductCollection
						title={
							<Typography.Title level={3} type="danger">
								{t('home_page.new_arrival')}
							</Typography.Title>
						}
						sideImage={sideImage2}
						products={productList2}
					/>
					<ProductCollection
						title={
							<Typography.Title level={3} type="success">
								{t('home_page.domestic_travel')}
							</Typography.Title>
						}
						sideImage={sideImage3}
						products={productList3}
					/>
				</div>
				<Footer />
			</>
		)
	}
}
export const HomePage = connect(
	mapStateToProps,
	mapDispatchToProps,
)(withTranslation()(HomePageComponent))
