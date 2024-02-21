<template>
      <div
          class="modal fade"
          id="productModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          ref="detialModal"
        >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>{{ tempProduct.title }}</span>
              </h5>
              <button type="button" class="btn-close btn-close-white"
                      data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                </div>
                <div class="col-sm-6">
                  <span class="badge bg-primary rounded-pill">{{ tempProduct.category }}</span>
                  <p>商品描述：{{ tempProduct.description }}</p>
                  <p>商品內容：{{ tempProduct.content }}</p>
                  <div class="h5" v-if="tempProduct.origin_price === tempProduct.price">
                    {{ tempProduct.price }} 元
                  </div>
                  <div v-else>
                    <del class="h6">原價 {{ tempProduct.origin_price}} 元</del>
                    <div class="h5">現在只要 {{ tempProduct.price }} 元</div>
                  </div>
                <div>
                  <div class="input-group">
                    <select name="" id="" class="form-select" v-model="qty">
                      <option :value="i" v-for="i in 20" :key="i">{{i}}</option>
                    </select>
                    <button type="button" class="btn btn-primary"
                    :disabled="tempProduct.id === status.addCartLoading"
                    @click="addToCart(tempProduct.id, qty)">
                    <span class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true" v-if="tempProduct.id === status.addCartLoading">
                    </span>
                      加入購物車</button>
                  </div>
                </div>
              </div>
                <!-- col-sm-6 end -->
            </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
// 匯入 BS5 才能用 BS5 方法創造 modal 實體
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    tempProduct: {
      type: Object,
      default() {
        return {};
      },
    },
    status: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // temP 要紀錄產品數量
  data() {
    return {
      // 儲存 bs5 modal 實例
      detialModal: '',
      qty: 1, // 將數量套用在 modal 的 input 上
    };
  },
  methods: {
    openModal() {
      this.myModal.show();
      this.qty = 1;
    },
    closeModal() {
      this.myModal.hide();
    },
  },
  watch: {
    // tempProduct 有變化 就重置
    tempProduct() {
      this.qty = 1;
    },
  },
  mounted() {
    this.myModal = new Modal(this.$refs.detialModal);
  },
};

</script>
