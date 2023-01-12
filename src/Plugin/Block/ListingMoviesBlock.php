<?php

namespace Drupal\custom_api\Plugin\Block;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\node\Entity\Node;

/**
 * Provides a block for Mortage Interest Block calculator.
 *
 * @Block(
 *   id = "listing_movies_block",
 *   admin_label = @Translation("Listing Movies via API Block"),
 * )
 */
class ListingMoviesBlock extends BlockBase implements BlockPluginInterface {
  /**
   * {@inheritdoc}
   */
  public function build() {

      $response = \Drupal::httpClient()->get("https://swapi.dev/api/films/", [
        'verify' => false,
          //'form_params' => $data,
            'headers' => [
              'Content-type' => 'application/x-www-form-urlencoded',
            ],
        ])->getBody()->getContents();
      $result = json_decode($response);
      $config = $this->getConfiguration();
      $limit = $config['custom_api_movies_limit'];
      if($limit){
         $new_result = array();
        foreach ($result->results as $key => $value) {
            If($key < $limit){
              $new_result[$key] = $value;
            }
        }
      }else{
        $new_result = $result->results;
      }
     
    $renderable = [
      '#theme' => 'listing_movies',
      '#result' => $new_result,
    ];

    return $renderable;

  }

  /**
   * {@inheritdoc}
   */
  protected function blockAccess(AccountInterface $account) {
    return AccessResult::allowedIfHasPermission($account, 'access content');
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    
    $form = parent::blockForm($form, $form_state);

    $config = $this->getConfiguration();
     
    $form['custom_api_movies_limit'] = array(
      '#type' => 'textfield',
      '#title' => t('Limit'),
      '#default_value' => (empty($config['custom_api_movies_limit']) ? '' : $config['custom_api_movies_limit']),
      '#description' => t('Enter value to limit the movies listing')
    );


    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    $this->configuration['custom_api_movies_limit'] = $form_state->getValue('custom_api_movies_limit');

  }


  public function getCacheMaxAge() {
    return 0;
  }
  
}

