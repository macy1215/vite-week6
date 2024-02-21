<template>
    <VueLoading v-model:active="isLoading"/>
        <div class="mt-4 container">
          <h5 class="mb-5">這是產品列表頁</h5>
          <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in products" :key="item.id">
                <td style="width: 180px">
                  <div style="height: 100px; background-size: cover;
                    background-position:center;" :style="{
                      backgroundImage:`url(${item.imageUrl})`
                  }"></div>
                </td>
                <td>
                  {{ item.title }}
                </td>
                <td>
                  <div class="h5" v-if="item.origin_price === item.price"> {{ item.price }} 元</div>
                  <div v-else>
                    <del class="h6">原價 {{ item.origin_price }} 元</del>
                    <div class="h5">現在只要 {{ item.price }} 元</div>
                  </div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="openModal(item)"
                        data-bs-toggle="modal"
                        :disabled="item.num === 0">
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status" aria-hidden="true" v-if="item.num === 0"></span>
                      查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger"
                    :disabled="item.id === status.addCartLoading"
                      @click="addToCart(item.id,1)">
                      <span class="spinner-border spinner-border-sm"
                      role="status" aria-hidden="true"
                      v-if="item.id === status.addCartLoading" ></span>
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 產品Modal -->
          <!-- <ProductModal :temp-Product="{tempProduct , status }"
          @add-to-cart="addToCart" ref="ProductModal" /> -->
          <ProductModal/>
          <!-- <ProductModal ref="ProductModal" :product="product" @add-to-cart="addToCart"/> -->
          <!-- 產品Modal -->
        </div>
</template>

<script>
import ProductModal from '../components/ProductModal.vue';

export default {
  data() {
    return {
      products: [''], // 資料存放
      product: {}, // 單一產品
      tempProduct: {
        imagesUrl: [],
      }, // 暫存區
      myModal: null, //  產品 modal
      page: {},
      status: {
        loadingItem: '',
        addCartLoading: '',
      },
      // 購物車列表
      carts: {},
      isLoading: false,
    };
  },
  components: {
    ProductModal,
  },
  mounted() {
    // 初始化
    setTimeout(() => {
      this.getProductList();
    }, 1000);
  },
  methods: {
    // 取得產品列表
    getProductList() {
      this.isLoading = true;
      const url = `${import.meta.env.VITE_URL}/api/${import.meta.env.VITE_NAME}/products`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    //  單一產品
    // getProduuct(id) {
    //   // console.log(id);
    //   this.isLoading = true;
    //   this.status.loadingItem = id;
    //   const url = `${import.meta.env.VITE_URL}/api/${import.meta.env.VITE_NAME}/products/${id}`;
    //   this.$http
    //     .get(url)
    //     .then((res) => {
    //       this.status.loadingItem = '';
    //       this.product = res.data.product;
    //       this.isLoading = false;
    //       this.$refs.productModal.openModal();
    //     })
    //     .catch((err) => {
    //       alert(err.response.data.message);
    //     });
    // },
    // 加入購物車
    addToCart(productId, qty = 1) {
      console.log(productId, qty);
      // this.status.addCartLoading = productId;
      // const order = {
      //   productId,
      //   qty,
      // };
      // const url = `${import.meta.env.VITE_URL}/api/${import.meta.env.VITE_NAME}/cart`;
      // this.$http
      //   .post(url, { data: order })
      //   .then((res) => {
      //     alert(res.data.message);
      //     this.status.addCartLoading = '';
      //     this.getCart();
      //     this.$refs.productModal.closeModal();
      //   })
      //   .catch((err) => {
      //     alert(err.response.data.message);
      //   });
    },
  },
};
</script>
